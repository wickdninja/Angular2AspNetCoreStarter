export class User {
    id: string;
    password: string;
    roles: string[];
    userName: string;

    constructor() {
        this.userName = 'anonymous_user';
        this.roles = [];
    }

    isInRole(role: string): boolean {
        let matched = this.roles.filter(r => r === role);
        return matched.length > 0;
    }

    isInRoles(roles: string[]): boolean {
        let matches = roles
            .filter(role => {
                return this.isInRole(role);
            });
        return matches.length === roles.length;
    }

    isInAtLeastOneRole(roles: string[]): boolean {
        let matches = roles
            .filter(role => {
                return this.isInRole(role);
            });
        return matches.length > 0;
    }
}
