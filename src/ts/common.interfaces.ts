export type Item = Map<any, any> | string | number | boolean;

export interface IUserInput {
    command: string;
    action: string | undefined;
    key?: string | undefined;
    value?: string | undefined;
};
