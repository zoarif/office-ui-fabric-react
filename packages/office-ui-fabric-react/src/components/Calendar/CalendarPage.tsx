import * as React from 'react';
import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
  PageMarkdown,
} from '@uifabric/example-app-base';
import { DateRangeType, DayOfWeek } from 'office-ui-fabric-react/lib/Calendar';
import { CalendarButtonExample } from './examples/Calendar.Button.Example';
import { CalendarInlineExample } from './examples/Calendar.Inline.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { CalendarStatus } from './Calendar.checklist';
import { addMonths, addYears } from '../../utilities/dateMath/DateMath';

const CalendarButtonExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Calendar/examples/Calendar.Button.Example.tsx') as string;
const CalendarInlineExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Calendar/examples/Calendar.Inline.Example.tsx') as string;

export class CalendarPage extends React.Component<IComponentDemoPageProps, any> {
  public render(): JSX.Element {
    const today = new Date(Date.now());
    return (
      <ComponentPage
        title='Calendar'
        componentName='CalendarExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Calendar'
        exampleCards={
          <div>
            <ExampleCard title='Inline Calendar' code={ CalendarInlineExampleCode }>
              <CalendarInlineExample
                isMonthPickerVisible={ false }
                dateRangeType={ DateRangeType.Day }
                autoNavigateOnSelection={ false }
                showGoToToday={ false }
              />
            </ExampleCard>
            <ExampleCard
              title='Inline Calendar with overlayed month picker when header is clicked'
              code={ CalendarInlineExampleCode }
            >
              <CalendarInlineExample
                showMonthPickerAsOverlay={ true }
                highlightCurrentMonth={ false }
                highlightSelectedMonth={ true }
                dateRangeType={ DateRangeType.Day }
                autoNavigateOnSelection={ false }
                showGoToToday={ false }
              />
            </ExampleCard>
            <ExampleCard
              title='Inline Calendar with month picker'
              code={ CalendarInlineExampleCode }
            >
              <CalendarInlineExample
                dateRangeType={ DateRangeType.Day }
                autoNavigateOnSelection={ false }
                highlightCurrentMonth={ false }
                highlightSelectedMonth={ true }
                showGoToToday={ true }
              />
            </ExampleCard>
            <ExampleCard
              title='Inline Calendar with week selection'
              code={ CalendarInlineExampleCode }
            >
              <CalendarInlineExample
                dateRangeType={ DateRangeType.Week }
                autoNavigateOnSelection={ true }
                highlightCurrentMonth={ false }
                highlightSelectedMonth={ true }
                showGoToToday={ true }
                showNavigateButtons={ true }
              />
            </ExampleCard>
            <ExampleCard
              title='Inline Calendar with month selection'
              code={ CalendarInlineExampleCode }
            >
              <CalendarInlineExample
                dateRangeType={ DateRangeType.Month }
                autoNavigateOnSelection={ true }
                highlightCurrentMonth={ false }
                highlightSelectedMonth={ true }
                showGoToToday={ true }
                showNavigateButtons={ true }
              />
            </ExampleCard>
            <ExampleCard title='Inline Calendar with week numbers' code={ CalendarInlineExampleCode }>
              <CalendarInlineExample
                isMonthPickerVisible={ false }
                dateRangeType={ DateRangeType.Day }
                autoNavigateOnSelection={ false }
                showGoToToday={ false }
                showWeekNumbers={ true }
              />
            </ExampleCard>
            <ExampleCard title='Inline Calendar with 6 weeks display by default' code={ CalendarInlineExampleCode }>
              <CalendarInlineExample
                isMonthPickerVisible={ false }
                dateRangeType={ DateRangeType.Day }
                autoNavigateOnSelection={ false }
                showGoToToday={ false }
                showSixWeeksByDefault={ true }
              />
            </ExampleCard>
            <ExampleCard title='Inline Calendar with month picker and no day picker' code={ CalendarInlineExampleCode }>
              <CalendarInlineExample
                dateRangeType={ DateRangeType.Month }
                autoNavigateOnSelection={ false }
                showGoToToday={ true }
                highlightCurrentMonth={ false }
                highlightSelectedMonth={ true }
                isDayPickerVisible={ false }
              />
            </ExampleCard>
            <ExampleCard
              title='Inline Calendar with date boundary (minDate, maxDate)'
              code={ CalendarInlineExampleCode }
            >
              <CalendarInlineExample
                dateRangeType={ DateRangeType.Day }
                autoNavigateOnSelection={ true }
                highlightCurrentMonth={ false }
                highlightSelectedMonth={ true }
                showGoToToday={ false }
                minDate={ addMonths(today, -1) }
                maxDate={ addYears(today, 1) }
              />
            </ExampleCard>
            <ExampleCard
              title='Calendar with selectableDays = [Tuesday, Wednesday, Friday, Saturday] provided, first day of week = Monday'
              code={ CalendarButtonExampleCode }
            >
              <CalendarInlineExample
                dateRangeType={ DateRangeType.WorkWeek }
                firstDayOfWeek={ DayOfWeek.Monday }
                autoNavigateOnSelection={ true }
                highlightCurrentMonth={ false }
                highlightSelectedMonth={ true }
                showGoToToday={ true }
                workWeekDays={ [DayOfWeek.Tuesday, DayOfWeek.Saturday, DayOfWeek.Wednesday, DayOfWeek.Friday] }
              />
            </ExampleCard>
            <ExampleCard
              title='Calendar launched from a button'
              code={ CalendarButtonExampleCode }
            >
              <CalendarButtonExample
              />
            </ExampleCard>
            <ExampleCard
              title='Month picker launched from a button'
              code={ CalendarButtonExampleCode }
            >
              <CalendarButtonExample
                isDayPickerVisible={ false }
                highlightCurrentMonth={ false }
                highlightSelectedMonth={ true }
                buttonString={ 'Click for Month Picker' }
              />
            </ExampleCard>
            <ExampleCard
              title='Calendar with overlayed month picker launched from a button'
              code={ CalendarButtonExampleCode }
            >
              <CalendarButtonExample
                showMonthPickerAsOverlay={ true }
                highlightCurrentMonth={ false }
                highlightSelectedMonth={ true }
                buttonString={ 'Click for Overlayed Day Picker and Month Picker' }
              />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Calendar/Calendar.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Calendar/docs/CalendarOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Calendar/docs/CalendarDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Calendar/docs/CalendarDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...CalendarStatus }
          />
        }
      />
    );
  }

}
