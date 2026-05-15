import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

async function generatePdfReport() {
  const reportPath = path.resolve(process.cwd(), 'playwright-report', 'index.html');
  const pdfOutputPath = path.resolve(process.cwd(), 'reports', 'test-results.pdf');

  if (!fs.existsSync(reportPath)) {
    console.error('Playwright HTML report not found. Run tests first.');
    return;
  }

  // Ensure reports directory exists
  if (!fs.existsSync(path.dirname(pdfOutputPath))) {
    fs.mkdirSync(path.dirname(pdfOutputPath), { recursive: true });
  }

  console.log('Generating PDF report...');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Load the HTML report
  await page.goto(`file://${reportPath}`, { waitUntil: 'networkidle' });

  // Wait for rendering
  await page.waitForTimeout(2000);

  // Generate PDF
  await page.pdf({
    path: pdfOutputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' }
  });

  await browser.close();
  console.log(`PDF report generated successfully at: ${pdfOutputPath}`);
}

generatePdfReport().catch(console.error);
