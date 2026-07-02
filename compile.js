const puppeteer = require('puppeteer');
const path = require('path');

async function compilePDF() {
  console.log('🚀 Starting SkyFlHigh Boxing Manual compilation...');
  
  // Launch headless browser
  const browser = await puppeteer.launch({
    headless: true
  });
  
  const page = await browser.newPage();
  
  // Get absolute path of the book.html file
  const filePath = path.join(__dirname, 'book.html');
  const fileUrl = `file://${filePath}`;
  
  console.log(`📖 Loading book template from: ${filePath}...`);
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });
  
  const outputPdfPath = path.join(__dirname, 'skyflhigh_boxing_manual.pdf');
  console.log(`📄 Generating PDF document...`);
  
  // Generate the PDF
  await page.pdf({
    path: outputPdfPath,
    format: 'Letter',
    printBackground: true, // Crucial to keep the dark mode backgrounds
    margin: {
      top: '0px',
      bottom: '0px',
      left: '0px',
      right: '0px'
    },
    preferCSSPageSize: true
  });
  
  console.log(`✨ PDF successfully compiled to: ${outputPdfPath}`);
  
  await browser.close();
}

compilePDF().catch(err => {
  console.error('❌ Failed to compile PDF:', err);
  process.exit(1);
});
