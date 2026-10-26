document.getElementById('fetch-btn').addEventListener('click', fetchTrends);

async function fetchTrends() {
  const listDiv = document.getElementById('trends-list');
  listDiv.innerHTML = '<p>ርዕሶችን በማምጣት ላይ...</p>';

  try {
    const response = await fetch('http://localhost:5000/api/tech-trends');
    const data = await response.json();

    listDiv.innerHTML = '';

    data.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'card';
      
      const promptText = `Act as a professional YouTube Tech Content Creator. Write an engaging 8-10 minute video script about: "${item.title}". Include Intro, 3 Main points, Outro, and Titles/Description.`;

      // ዋናውን ኮንቴነር መፍጠር
      card.innerHTML = `
        <h3>${index + 1}. ${item.title}</h3>
        <p><a href="${item.url}" target="_blank" rel="noopener noreferrer">መጣጥፉን አንብብ</a></p>
      `;
      // ለኮፒ ቁልፍ (Button) የሚሆን ኤለመንት በ JavaScript መፍጠር (SyntaxError እንዳይመጣ ይከላከላል)
      const copyBtn = document.createElement('button');
      copyBtn.textContent = '📋 Copy Prompt for ChatGPT';
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(promptText);
        alert('ለ ChatGPT የሚሆነው Prompt ኮፒ ሆኗል!');
      };

      card.appendChild(copyBtn);
      listDiv.appendChild(card);
    });
  } catch (error) {
    listDiv.innerHTML = '<p style="color:red">ዳታ ማምጣት አልተቻለም። Backend እየሰራ መሆኑን አረጋግጥ።</p>';
  }
}