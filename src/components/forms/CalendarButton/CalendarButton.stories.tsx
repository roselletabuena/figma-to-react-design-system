import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarButton } from './CalendarButton';
import type { CalendarButtonState } from './CalendarButton.types';

const states: CalendarButtonState[] = [
  'default',
  'hover',
  'active',
  'hidden',
  'disabled',
  'range',
  'range-disabled',
];

const meta = {
  title: 'Components/Forms/Calendar Button',
  component: CalendarButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  argTypes: {
    state: {
      control: 'select',
      options: states,
      description: 'The visual and interaction state of the calendar button.',
    },
    number: {
      control: 'text',
      description: 'Day number to display.',
    },
    disabled: {
      control: 'boolean',
      description: 'Explicit disabled state.',
    },
    children: { control: false },
  },
  args: {
    number: '1',
    state: 'default',
  },
} satisfies Meta<typeof CalendarButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const AllVariantsGrid = () => (
  <div className="flex flex-col gap-sds-800 p-sds-400">
    <div>
      <h3 className="mb-sds-400 font-subheading text-text-secondary">All States (Figma Spec)</h3>
      <div className="grid grid-cols-4 gap-sds-400 sm:grid-cols-7">
        {states.map((st) => (
          <div key={st} className="flex flex-col items-center gap-sds-200">
            <span className="font-body-small text-text-secondary">{st}</span>
            <div className="flex size-sds-icon-large items-center justify-center rounded-sds-200 border border-dashed border-border-default p-sds-050">
              <CalendarButton state={st} number="1" />
            </div>
          </div>
        ))}
      </div>
    </div>

    <div>
      <h3 className="mb-sds-400 font-subheading text-text-secondary">Calendar Grid Preview</h3>
      <div className="w-[308px] rounded-sds-200 border border-border-default bg-surface p-sds-400 shadow-sds-100">
        <div className="mb-sds-200 grid grid-cols-7 text-center font-body-small-strong text-text-secondary">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
            <div key={d} className="size-sds-icon-large leading-10">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-sds-050 text-center">
          {/* Padding / hidden days */}
          <CalendarButton state="hidden" />
          <CalendarButton state="hidden" />
          {/* Day 1 - 4 normal */}
          <CalendarButton number="1" />
          <CalendarButton number="2" />
          <CalendarButton number="3" />
          <CalendarButton number="4" />
          <CalendarButton number="5" />
          {/* Week 2: Range selection preview */}
          <CalendarButton number="6" />
          <CalendarButton number="7" />
          <CalendarButton number="8" />
          <CalendarButton number="9" />
          <CalendarButton state="active" number="10" />
          <CalendarButton state="range" number="11" />
          <CalendarButton state="range" number="12" />
          {/* Week 3: Continuing range and hover */}
          <CalendarButton state="range" number="13" />
          <CalendarButton state="hover" number="14" />
          <CalendarButton number="15" />
          <CalendarButton number="16" />
          <CalendarButton number="17" />
          <CalendarButton number="18" />
          <CalendarButton number="19" />
          {/* Week 4: Disabled days */}
          <CalendarButton number="20" />
          <CalendarButton number="21" />
          <CalendarButton number="22" />
          <CalendarButton number="23" />
          <CalendarButton number="24" />
          <CalendarButton number="25" />
          <CalendarButton number="26" />
          {/* Week 5 */}
          <CalendarButton number="27" />
          <CalendarButton number="28" />
          <CalendarButton number="29" />
          <CalendarButton number="30" />
          <CalendarButton number="31" />
          <CalendarButton state="disabled" number="1" />
          <CalendarButton state="range-disabled" number="2" />
        </div>
      </div>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    state: 'default',
    number: '1',
  },
};

export const Hover: Story = {
  args: {
    state: 'hover',
    number: '1',
  },
};

export const Active: Story = {
  args: {
    state: 'active',
    number: '1',
  },
};

export const Hidden: Story = {
  args: {
    state: 'hidden',
    number: '1',
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center rounded-sds-200 border border-dashed border-border-default p-sds-050">
        <Story />
      </div>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    state: 'disabled',
    number: '1',
  },
};

export const Range: Story = {
  args: {
    state: 'range',
    number: '1',
  },
};

export const RangeDisabled: Story = {
  args: {
    state: 'range-disabled',
    number: '1',
  },
};

export const AllVariants: Story = {
  render: () => <AllVariantsGrid />,
};

export const DarkMode: Story = {
  tags: ['!autodocs'],
  parameters: {
    theme: 'dark',
  },
  render: () => <AllVariantsGrid />,
};
