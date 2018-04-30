import { ReactWrapper } from 'enzyme';

export const findNodes = (wrapper: ReactWrapper<any, any>, className: string): ReactWrapper<any, any> => (
  wrapper
    .find(className)
    .filterWhere(((node: ReactWrapper<any, any>) => typeof node.type() === 'string'))
);

export const expectNodes = (wrapper: ReactWrapper<any, any>, className: string, n: number): void => (
  expect(findNodes(wrapper, className).length).toEqual(n)
);

export const expectOne = (wrapper: ReactWrapper<any, any>, className: string): void => (
  expectNodes(wrapper, className, 1)
);

export const expectMissing = (wrapper: ReactWrapper<any, any>, className: string): void => (
  expectNodes(wrapper, className, 0)
);
