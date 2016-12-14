import { Charts, Direction } from './enums';

export class CarouselVm {
    isCheckingVisible = true;
    isSavingsVisible = false;
    isBillsDueVisible = false;
    isPendingVisible = false;
    active: Charts;

    constructor() {
        this.active = Charts.Bills;
    }

    next() {
        this.cycle(Direction.NEXT);
    }

    prev() {
        this.cycle(Direction.PREV);
    }

    private cycle(delta: number) {
        this.active += delta;
        switch (this.active) {
            case Charts.Bills:
                this.isCheckingVisible = false;
                this.isSavingsVisible = false;
                this.isBillsDueVisible = true;
                this.isPendingVisible = false;
                break;
            case Charts.Checking:
                this.isCheckingVisible = true;
                this.isSavingsVisible = false;
                this.isBillsDueVisible = false;
                this.isPendingVisible = false;
                break;
            case Charts.Savings:
                this.isCheckingVisible = false;
                this.isSavingsVisible = true;
                this.isBillsDueVisible = false;
                this.isPendingVisible = false;
                break;
            case Charts.Pending:
                this.isCheckingVisible = false;
                this.isSavingsVisible = false;
                this.isBillsDueVisible = false;
                this.isPendingVisible = true;
                break;
            default:
                this.active = (this.active < 0) ? Charts.Pending : Charts.Bills;
                this.cycle(0);
                break;
        }
    }
}
