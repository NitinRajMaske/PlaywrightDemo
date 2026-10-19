import {expect, defineConfig, devices} from '@playwright/test'

export default defineConfig({

  //testDir:'./tests/src',
  timeout:30000,
  workers:2,
  //retries:1,
  expect:{
    timeout:5000
  },
  reporter:'html',

  projects:[

    {
      name:'setup',
      testMatch: /setup\.auth\.ts/
    },
    {
      name:'chrome',
      use:{
              browserName:'chromium',
              headless:false,
              screenshot:'only-on-failure',
              trace:'on-first-retry',
              video:'retain-on-failure',
              storageState: 'user.json',
              launchOptions: {
                              slowMo: 3000, 
                              },
            },
            dependencies: ['setup'],
            testIgnore: /setup\.auth\.ts/, // Avoid running setup twice
          },
    
  ]


})
