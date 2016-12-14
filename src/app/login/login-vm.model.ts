export class LoginVm {
    public username: string;
    public passwordPlainText: string;
    get password(): string {
       return (this.plainTextPasswordIsValid()) ?  window.btoa(this.passwordPlainText) : null;
    }

    private plainTextPasswordIsValid(): boolean {
        return this.passwordPlainText !== undefined
            && this.passwordPlainText !== null
            && this.passwordPlainText.length > 0;
    }
}

