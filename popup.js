let correctAnswers = [];
let studentAnswers = [];

function fetchCorrectAnswersFromTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                const rows = document.querySelectorAll('#table-scroll > table > tbody > tr');
                return Array.from(rows).map((row, index) => {
                    const serial = row.querySelector('th')?.innerText.trim();
                    const qid = row.querySelector('td:nth-child(2)')?.innerText.trim();
                    const correct = row.querySelector('td:nth-child(3)')?.innerText.trim();
                    return { serial, questionID: qid, correctOption: correct };
                });
            }
        }, (injectionResults) => {
            correctAnswers = injectionResults[0].result;
            alert('Correct answers fetched: ' + correctAnswers.length);
        });
    });
}

document.getElementById('fetch-answers').addEventListener('click', fetchCorrectAnswersFromTab);

document.getElementById('upload-sheet').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const html = e.target.result;
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const sections = doc.querySelectorAll('body > div > div.grp-cntnr > div');
        studentAnswers = [];
        let serial = 1;

        sections.forEach(section => {
            const panels = section.querySelectorAll('.question-pnl');
            panels.forEach(pnl => {
                const qid = pnl.querySelector('.menu-tbl tr:nth-child(2) > td.bold')?.innerText.trim();
                const chosen = pnl.querySelector('.menu-tbl tr:nth-child(8) > td.bold')?.innerText.trim();

                let seq = pnl.querySelector('.questionRowTbl tr:nth-child(6) > td:nth-child(1)')?.innerText.trim();
                if (!seq) {
                    const tbody = pnl.querySelector('.questionRowTbl tbody');
                    const tds = tbody ? Array.from(tbody.querySelectorAll('tr > td:first-child')) : [];
                    const match = tds.find(td => /Q\.\d+/.test(td.innerText.trim()));
                    seq = match ? match.innerText.trim() : '';
                }

                if (qid && chosen) {
                    studentAnswers.push({ serial: serial++, questionNumber: seq, questionID: qid, selectedOption: chosen });
                }
            });
        });
        alert('Answer sheet loaded: ' + studentAnswers.length + ' answers');
    };
    reader.readAsText(file);
});

document.getElementById('process-result').addEventListener('click', () => {
    const merged = studentAnswers.map(ans => {
        const match = correctAnswers.find(c => c.questionID === ans.questionID);
        const correct = match ? match.correctOption : 'N/A';
        const isCorrect = ans.selectedOption === correct;
        return {
            ...ans,
            correctOption: correct,
            marks: isCorrect ? 2 : 0,
            paper: ans.serial <= 50 ? 'Paper 1' : 'Paper 2'
        };
    });

    const paper1 = merged.filter(m => m.paper === 'Paper 1');
    const paper2 = merged.filter(m => m.paper === 'Paper 2');

    const correct1 = paper1.filter(m => m.marks === 2).length;
    const correct2 = paper2.filter(m => m.marks === 2).length;
    const totalMarks = merged.reduce((acc, m) => acc + m.marks, 0);

    const resultDiv = document.createElement('div');
    resultDiv.innerHTML = `
    <h3>Result Summary</h3>
    <table border="1" width="100%" style="border-collapse: collapse; text-align: center;">
      <thead><tr><th>Paper</th><th>Correct Answers</th><th>Marks</th></tr></thead>
      <tbody>
        <tr><td>Paper 1 (1–50)</td><td>${correct1}</td><td>${correct1 * 2}</td></tr>
        <tr><td>Paper 2 (51+)</td><td>${correct2}</td><td>${correct2 * 2}</td></tr>
        <tr><td colspan="2"><b>Total Marks</b></td><td><b>${totalMarks}</b></td></tr>
      </tbody>
    </table>
  `;

    document.body.appendChild(resultDiv);

    let csv = 'Serial Number,Question Number,Question ID,Selected Option,Correct Option,Marks\n';
    merged.forEach(m => {
        csv += `${m.serial},${m.questionNumber},${m.questionID},${m.selectedOption},${m.correctOption},${m.marks}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    chrome.downloads.download({ url, filename: 'UGC_NET_Result.csv' });
});
