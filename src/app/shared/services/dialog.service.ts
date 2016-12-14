import { Injectable } from '@angular/core';

@Injectable()
export class IDialogService {
    alert(message: string): void { return void (0); };
    error(error: any): string { return ''; };
    prompt(message: string): string { return ''; };
}

@Injectable()
export class DialogService implements IDialogService {
    alert(message: string): void {
        window.alert(message);
    }

    error(error: any): string {
        let message = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        window.alert(message);
        return message;
    }

    prompt(message: string): string {
        return window.prompt(message);
    }
}

@Injectable()
export class MockDialogService implements IDialogService {
    alert(message: string): void {
        console.log(`alert called with ${message}`);
    }
    error(error: any): string {
        console.log(`error called with ${error.message}`);
        return error.message;
    }
    prompt(message: string): string {
        console.log(`prompt called with message ${message}`);
        return message;
    }

}
