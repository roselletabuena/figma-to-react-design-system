import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '../../../index.css';
import { Button } from '../Button';
import { ButtonGroup } from './ButtonGroup';
import type { ButtonGroupAlign } from './ButtonGroup.types';

const renderGroup = (align?: ButtonGroupAlign) =>
  render(
    <div style={{ width: 240 }}>
      <ButtonGroup align={align} data-testid="group">
        <Button variant="subtle">Cancel</Button>
        <Button>Save</Button>
      </ButtonGroup>
    </div>,
  );

describe('ButtonGroup', () => {
  describe('rendering', () => {
    it('renders its buttons inside a group', () => {
      renderGroup();
      const group = screen.getByRole('group');
      expect(group.querySelectorAll('button')).toHaveLength(2);
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeDefined();
      expect(screen.getByRole('button', { name: 'Save' })).toBeDefined();
    });

    it('merges a custom className and forwards HTML attributes', () => {
      render(
        <ButtonGroup className="custom" aria-label="Actions" data-testid="group">
          <Button>Save</Button>
        </ButtonGroup>,
      );
      const group = screen.getByRole('group', { name: 'Actions' });
      expect(group.className).toContain('custom');
      expect(group.className).toContain('gap-sds-400');
    });
  });

  // Rendered against the real stylesheet: values come from the Figma Button Group spec
  // (component set 2072:9432).
  describe('rendered design spec', () => {
    it('lays buttons out in a row with a 16px gap', () => {
      renderGroup();
      const style = getComputedStyle(screen.getByTestId('group'));
      expect(style.display).toBe('flex');
      expect(style.flexDirection).toBe('row');
      expect(parseFloat(style.columnGap)).toBe(16);
      expect(style.alignItems).toBe('center');
    });

    it.each([
      ['start', 'flex-start'],
      ['end', 'flex-end'],
      ['center', 'center'],
    ] as const)('%s packs the buttons to the %s', (align, justify) => {
      renderGroup(align);
      expect(getComputedStyle(screen.getByTestId('group')).justifyContent).toBe(justify);
    });

    it('start keeps each button at its natural width', () => {
      renderGroup('start');
      const [cancel, save] = screen.getAllByRole('button');
      expect(cancel.getBoundingClientRect().width).toBeLessThan(120);
      expect(save.getBoundingClientRect().width).toBeLessThan(120);
    });

    it('end places the last button against the right edge', () => {
      renderGroup('end');
      const group = screen.getByTestId('group').getBoundingClientRect();
      const save = screen.getByRole('button', { name: 'Save' }).getBoundingClientRect();
      expect(Math.round(save.right)).toBe(Math.round(group.right));
    });

    it('justify shares the row equally: two 112px buttons in 240px', () => {
      renderGroup('justify');
      const [cancel, save] = screen.getAllByRole('button');
      expect(cancel.getBoundingClientRect().width).toBe(112);
      expect(save.getBoundingClientRect().width).toBe(112);
    });

    it('stack uses a column of full-width buttons with a 16px gap', () => {
      renderGroup('stack');
      const style = getComputedStyle(screen.getByTestId('group'));
      expect(style.flexDirection).toBe('column');
      expect(parseFloat(style.rowGap)).toBe(16);
      const [cancel, save] = screen.getAllByRole('button');
      const a = cancel.getBoundingClientRect();
      const b = save.getBoundingClientRect();
      expect(a.width).toBe(240);
      expect(b.width).toBe(240);
      // 40px tall buttons, 16px apart: 40 + 16 + 40 = 96 (Figma frame height).
      expect(b.top - a.bottom).toBe(16);
      expect(screen.getByTestId('group').getBoundingClientRect().height).toBe(96);
    });
  });
});
