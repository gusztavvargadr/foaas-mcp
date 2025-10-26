#!/usr/bin/env node

/**
 * Simple test script to verify FOAAS MCP Server functionality
 * 
 * This script tests:
 * 1. Health endpoint
 * 2. FOAAS API client directly
 * 3. Tool handlers
 */

import { FoaasClient } from './dist/foaas/client.js';
import { thanksTool } from './dist/tools/individual/thanks.js';
import { expressAppreciationTool } from './dist/tools/groups/express-appreciation.js';

async function main() {
  console.log('🧪 FOAAS MCP Server Test Suite\n');

  // Test 1: FOAAS Client
  console.log('Test 1: FOAAS Client Direct Access');
  const client = new FoaasClient();
  
  try {
    const response = await client.thanks('TestBot');
    console.log('✅ FOAAS Client working');
    console.log(`   Message: ${response.message}`);
    console.log(`   Subtitle: ${response.subtitle}\n`);
  } catch (error) {
    console.error('❌ FOAAS Client failed:', error);
    process.exit(1);
  }

  // Test 2: Individual Tool
  console.log('Test 2: Individual Tool (foaas_thanks)');
  try {
    const result = await thanksTool.handler({ from: 'TestBot' }, client);
    console.log('✅ Individual tool working');
    console.log(`   Content items: ${result.content.length}`);
    console.log(`   Message: ${result.content[0].text}`);
    console.log(`   Subtitle: ${result.content[1].text}\n`);
  } catch (error) {
    console.error('❌ Individual tool failed:', error);
    process.exit(1);
  }

  // Test 3: Group Tool with Random
  console.log('Test 3: Group Tool with Random Selection');
  try {
    const result = await expressAppreciationTool.handler(
      { from: 'TestBot' },
      client
    );
    console.log('✅ Group tool (random) working');
    console.log(`   Content items: ${result.content.length}\n`);
  } catch (error) {
    console.error('❌ Group tool (random) failed:', error);
    process.exit(1);
  }

  // Test 4: Group Tool with Target
  console.log('Test 4: Group Tool with Target Parameter');
  try {
    const result = await expressAppreciationTool.handler(
      { to: 'Alice', from: 'TestBot' },
      client
    );
    console.log('✅ Group tool (with target) working');
    console.log(`   Content items: ${result.content.length}\n`);
  } catch (error) {
    console.error('❌ Group tool (with target) failed:', error);
    process.exit(1);
  }

  // Test 5: Health Endpoint
  console.log('Test 5: HTTP Health Endpoint');
  try {
    const response = await fetch('http://localhost:3000/health');
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Health endpoint working');
      console.log(`   Status: ${data.status}`);
      console.log(`   Service: ${data.service}\n`);
    } else {
      console.log('⚠️  Server not running on http://localhost:3000');
      console.log('   Start with: npm run dev\n');
    }
  } catch (error) {
    console.log('⚠️  Server not running on http://localhost:3000');
    console.log('   Start with: npm run dev\n');
  }

  console.log('✅ All tests passed!\n');
  console.log('Next steps:');
  console.log('  1. Start server: npm run dev');
  console.log('  2. Check health: curl http://localhost:3000/health');
  console.log('  3. Connect MCP client to http://localhost:3000/sse');
}

main().catch(error => {
  console.error('Test suite failed:', error);
  process.exit(1);
});
