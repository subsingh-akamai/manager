import * as React from 'react';
import { FirewallRulesLanding } from 'src/features/Firewalls/FirewallDetail/Rules/FirewallRulesLanding';
import { componentTests } from 'support/util/components';
import { randomItem, randomString } from 'support/util/random';

import { firewallRuleFactory } from 'src/factories';

import type { FirewallRuleType } from '@linode/api-v4';

import '@4tw/cypress-drag-drop';

const portPresetMap = {
  '22': 'SSH',
  '80': 'HTTP',
  '443': 'HTTPS',
  '3306': 'MySQL',
  '53': 'DNS',
};

const mockInboundRule = (label: string) => {
  return firewallRuleFactory.build({
    label: label,
    description: randomString(),
    action: 'ACCEPT',
    ports: randomItem(Object.keys(portPresetMap)),
  });
};

const mockOutboundRule = (label: string) => {
  return firewallRuleFactory.build({
    label: label,
    description: randomString(),
    action: 'DROP',
    ports: randomItem(Object.keys(portPresetMap)),
  });
};

componentTests('Firewall Rules', (mount) => {
  describe('firewall inbound rules drag & drop with mouse and keyboard tests', () => {
    let inboundRule1: FirewallRuleType;
    let inboundRule2: FirewallRuleType;
    let inboundRule3: FirewallRuleType;

    // Note that nth-child is 1-indexed
    const tableRow = 'div[aria-label="inbound Rules List"] tbody tr';
    const firstRow =
      'div[aria-label="inbound Rules List"] tbody tr:nth-child(1)';
    const secondRow =
      'div[aria-label="inbound Rules List"] tbody tr:nth-child(2)';

    // Mock 3 inbound rules
    beforeEach(() => {
      inboundRule1 = mockInboundRule('inbound_rule_1');
      inboundRule2 = mockInboundRule('inbound_rule_2');
      inboundRule3 = mockInboundRule('inbound_rule_3');

      mount(
        <FirewallRulesLanding
          rules={{
            inbound: [inboundRule1, inboundRule2, inboundRule3],
            inbound_policy: 'ACCEPT',
            outbound_policy: 'DROP',
          }}
          disabled={false}
          firewallID={1}
        />
      );
    });

    // Test the drag and drop functionality using mouse
    it('mouse drag and drop functionality should work for firewall inbound rules table', () => {
      // Drag the 1st row rule to 2nd row position
      // Note that eq is 0-indexed
      cy.get(tableRow).eq(0).drag(secondRow, { force: true });

      // Verify the labels in the 1st, 2nd, and 3rd rows
      cy.get(tableRow).eq(0).should('contain', inboundRule2.label);
      cy.get(tableRow).eq(1).should('contain', inboundRule1.label);
      cy.get(tableRow).eq(2).should('contain', inboundRule3.label);

      // Drag the 3rd row rule to 2nd row position
      cy.get(tableRow).eq(2).drag(secondRow, { force: true });

      // Verify the labels in the 1st, 2nd, and 3rd rows
      cy.get(tableRow).eq(0).should('contain', inboundRule2.label);
      cy.get(tableRow).eq(1).should('contain', inboundRule3.label);
      cy.get(tableRow).eq(2).should('contain', inboundRule1.label);

      // Drag the 3rd row rule to 1st position
      cy.get(tableRow).eq(2).drag(firstRow, { force: true });

      // Verify the labels in the 1st, 2nd, and 3rd rows
      cy.get(tableRow).eq(0).should('contain', inboundRule1.label);
      cy.get(tableRow).eq(1).should('contain', inboundRule2.label);
      cy.get(tableRow).eq(2).should('contain', inboundRule3.label);
    });
  });
  describe('firewall outbound rules drag & drop with mouse and keyboard tests', () => {
    let outboundRule1: FirewallRuleType;
    let outboundRule2: FirewallRuleType;
    let outboundRule3: FirewallRuleType;

    // Note that nth-child is 1-indexed
    const tableRow = 'div[aria-label="outbound Rules List"] tbody tr';
    const firstRow =
      'div[aria-label="outbound Rules List"] tbody tr:nth-child(1)';
    const secondRow =
      'div[aria-label="outbound Rules List"] tbody tr:nth-child(2)';

    beforeEach(() => {
      outboundRule1 = mockOutboundRule('outbound_rule_1');
      outboundRule2 = mockOutboundRule('outbound_rule_2');
      outboundRule3 = mockOutboundRule('outbound_rule_3');

      mount(
        <FirewallRulesLanding
          rules={{
            outbound: [outboundRule1, outboundRule2, outboundRule3],
            inbound_policy: 'ACCEPT',
            outbound_policy: 'DROP',
          }}
          disabled={false}
          firewallID={1}
        />
      );
    });

    it('mouse drag and drop functionality should work for firewall outbound rules table', () => {
      // Drag the 1st row rule to 2nd row position
      // Note that eq is 0-indexed
      cy.get(tableRow).eq(0).drag(secondRow, { force: true });

      // Verify the labels in the 1st, 2nd, and 3rd rows
      cy.get(tableRow).eq(0).should('contain', outboundRule2.label);
      cy.get(tableRow).eq(1).should('contain', outboundRule1.label);
      cy.get(tableRow).eq(2).should('contain', outboundRule3.label);

      // Drag the 3rd row rule to 2nd row position
      cy.get(tableRow).eq(2).drag(secondRow, { force: true });

      // Verify the labels in the 1st, 2nd, and 3rd rows
      cy.get(tableRow).eq(0).should('contain', outboundRule2.label);
      cy.get(tableRow).eq(1).should('contain', outboundRule3.label);
      cy.get(tableRow).eq(2).should('contain', outboundRule1.label);

      // Drag the 3rd row rule to 1st position
      cy.get(tableRow).eq(2).drag(firstRow, { force: true });

      // Verify the labels in the 1st, 2nd, and 3rd rows
      cy.get(tableRow).eq(0).should('contain', outboundRule1.label);
      cy.get(tableRow).eq(1).should('contain', outboundRule2.label);
      cy.get(tableRow).eq(2).should('contain', outboundRule3.label);
    });
  });
});
