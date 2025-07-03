import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  
   //Timeout for each step
   //timeout: 20 * 1000,

   //Timeout for expect --> Assertions
   expect : {
     timeout: 40*1000
   }, 
 
   use: {
    headless: false,
    screenshot: 'on',
    trace: 'on',
  },

   reporter: 'html',

   workers: 4,
   
   //object to declare browser
   projects: [
    { name: 'Chromium', use: { browserName: 'chromium' } },
    //{ name: 'Firefox', use: { browserName: 'firefox' } },
    { name: 'WebKit', use: { browserName: 'webkit' } },
  ],
});