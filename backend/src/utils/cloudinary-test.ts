/**
 * Cloudinary Connection Test Script
 *
 * This script verifies Cloudinary connection and configuration without uploading any files.
 * Run with: npx ts-node src/utils/cloudinary-test.ts
 *
 * Compatible with cloudinary v2.8.0
 */

import { testConnection, getConfigStatus, getUsage } from './cloudinary';

interface TestResult {
  name: string;
  passed: boolean;
  message: string;
  details?: unknown;
}

async function runTests(): Promise<void> {
  console.log('='.repeat(60));
  console.log('Cloudinary Connection Test Suite');
  console.log('Compatible with cloudinary v2.8.0');
  console.log('='.repeat(60));
  console.log('');

  const results: TestResult[] = [];

  // Test 1: Configuration Check
  console.log('[Test 1] Checking Cloudinary configuration...');
  const configStatus = getConfigStatus();

  results.push({
    name: 'Configuration Check',
    passed: configStatus.configured,
    message: configStatus.configured
      ? 'Configured for cloud: ' + configStatus.cloudName
      : 'Missing configuration',
    details: {
      cloudName: configStatus.cloudName || '(not set)',
      hasApiKey: configStatus.hasApiKey,
      hasApiSecret: configStatus.hasApiSecret,
    },
  });

  if (!configStatus.configured) {
    console.log('  [FAIL] Configuration incomplete');
    console.log('  Details:', JSON.stringify(results[0].details, null, 2));
    console.log('');
    console.log('  Please set the following environment variables:');
    if (!configStatus.cloudName) console.log('    - CLOUDINARY_CLOUD_NAME');
    if (!configStatus.hasApiKey) console.log('    - CLOUDINARY_API_KEY');
    if (!configStatus.hasApiSecret) console.log('    - CLOUDINARY_API_SECRET');
    console.log('');
    printSummary(results);
    process.exit(1);
  }

  console.log('  [PASS] Configuration complete');
  console.log('  Cloud Name: ' + configStatus.cloudName);
  console.log('');

  // Test 2: API Connection (Ping)
  console.log('[Test 2] Testing API connection (ping)...');
  try {
    const connected = await testConnection();
    results.push({
      name: 'API Connection',
      passed: connected,
      message: connected ? 'Successfully connected to Cloudinary API' : 'Connection failed',
    });

    if (connected) {
      console.log('  [PASS] API connection successful');
    } else {
      console.log('  [FAIL] API connection failed');
    }
  } catch (error) {
    results.push({
      name: 'API Connection',
      passed: false,
      message: 'Connection error',
      details: error instanceof Error ? error.message : String(error),
    });
    console.log('  [FAIL] API connection error:', error instanceof Error ? error.message : error);
  }
  console.log('');

  // Test 3: Usage Information (requires Admin API)
  console.log('[Test 3] Fetching account usage information...');
  try {
    const usage = await getUsage();

    if (usage) {
      const percentStr = usage.usedPercent.toFixed(2);
      results.push({
        name: 'Usage Information',
        passed: true,
        message: 'Credits used: ' + percentStr + '%',
        details: usage,
      });
      console.log('  [PASS] Successfully retrieved usage information');
      console.log('  Credits Used: ' + usage.used + ' / ' + usage.limit + ' (' + percentStr + '%)');
    } else {
      results.push({
        name: 'Usage Information',
        passed: false,
        message: 'Could not retrieve usage information',
      });
      console.log('  [WARN] Could not retrieve usage information');
    }
  } catch (error) {
    results.push({
      name: 'Usage Information',
      passed: false,
      message: 'Error fetching usage',
      details: error instanceof Error ? error.message : String(error),
    });
    console.log('  [WARN] Error fetching usage:', error instanceof Error ? error.message : error);
  }
  console.log('');

  // Test 4: URL Generation (doesn't require API call)
  console.log('[Test 4] Testing URL generation...');
  try {
    const cloudinaryModule = await import('./cloudinary');
    const cloudinary = cloudinaryModule.default;

    const testPublicId = 'test/sample-image';
    const generatedUrl = cloudinary.url(testPublicId, {
      width: 300,
      height: 300,
      crop: 'fill',
      secure: true,
    });

    const urlValid = generatedUrl.includes('cloudinary.com') &&
                     generatedUrl.includes(configStatus.cloudName || '') &&
                     generatedUrl.includes('w_300') &&
                     generatedUrl.includes('h_300');

    results.push({
      name: 'URL Generation',
      passed: urlValid,
      message: urlValid ? 'URL generation working correctly' : 'URL generation failed',
      details: { sampleUrl: generatedUrl },
    });

    if (urlValid) {
      console.log('  [PASS] URL generation working');
      console.log('  Sample URL: ' + generatedUrl);
    } else {
      console.log('  [FAIL] URL generation issue');
      console.log('  Generated: ' + generatedUrl);
    }
  } catch (error) {
    results.push({
      name: 'URL Generation',
      passed: false,
      message: 'Error generating URL',
      details: error instanceof Error ? error.message : String(error),
    });
    console.log('  [FAIL] Error:', error instanceof Error ? error.message : error);
  }
  console.log('');

  printSummary(results);
}

function printSummary(results: TestResult[]): void {
  console.log('='.repeat(60));
  console.log('Test Summary');
  console.log('='.repeat(60));

  const passed = results.filter((r) => r.passed).length;
  const total = results.length;

  for (const result of results) {
    const status = result.passed ? '[PASS]' : '[FAIL]';
    console.log('  ' + status + ' ' + result.name + ': ' + result.message);
  }

  console.log('');
  console.log('Results: ' + passed + '/' + total + ' tests passed');

  if (passed === total) {
    console.log('');
    console.log('All tests passed! Cloudinary is properly configured and connected.');
  } else {
    console.log('');
    console.log('Some tests failed. Please check your configuration.');
  }

  console.log('='.repeat(60));
}

// Run the tests
runTests().catch((error) => {
  console.error('Fatal error running tests:', error);
  process.exit(1);
});
