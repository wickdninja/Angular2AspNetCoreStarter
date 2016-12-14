enum VisibilityState {
    VISIBLE,
    HIDDEN
}

enum CompletionState {
    NONE,
    SUCCESS,
    ERROR,
}

export class LoaderModel {
    closable = false;
    states = {
        visibility: VisibilityState,
        completion: CompletionState,
    };

    visibility: VisibilityState;
    completion: CompletionState;

    message = 'Loading...';

    setVisibility(value: boolean) {
        this.completion = this.states.completion.NONE;
        this.visibility = (value) ? this.states.visibility.VISIBLE : this.states.visibility.HIDDEN;
        this.closable = !value;
    }

    success(message: string) {
        this.message = message;
        this.completion = this.states.completion.SUCCESS;
        this.visibility = this.states.visibility.VISIBLE;
        this.closable = true;
    }

    error(message: string) {
        this.message = message;
        this.completion = this.states.completion.ERROR;
        this.visibility = this.states.visibility.VISIBLE;
        this.closable = true;
    }

    close() {
        if (this.closable) {
            this.message = null;
            this.completion = this.states.completion.NONE;
            this.visibility = this.states.visibility.HIDDEN;
        }
    }
}

