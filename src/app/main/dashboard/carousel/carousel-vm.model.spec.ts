
import { CarouselVm } from './carousel-vm.model';
import { Charts } from './enums';

describe('View Model: CarouselVm', () => {

    let model: CarouselVm;

    it('should create an instance', () => {
        model = new CarouselVm();
        expect(model).toBeDefined();
    });
    describe('with default model set', () => {
        beforeEach(() => {
            model = new CarouselVm();
        });
        it('should default to the Bills chart', () => {
            expect(model.active).toBe(Charts.Bills);
        });

        it('should move to Checking on next', () => {
            model.next();
            expect(model.active).toBe(Charts.Checking);
        });

        it('should move to Checking on prev', () => {
            model.prev();
            expect(model.active).toBe(Charts.Pending);
        });

        describe('with default model set to 1st next position', () => {
            beforeEach(() => {
                model.next();
            });

            it('should move to Savings on next', () => {
                model.next();
                expect(model.active).toBe(Charts.Savings);
            });

            it('should move to Bills on prev', () => {
                model.prev();
                expect(model.active).toBe(Charts.Bills);
            });

            describe('with default model set to 2nd next position', () => {
                beforeEach(() => {
                    model.next();
                });

                it('should move to Pending on next', () => {
                    model.next();
                    expect(model.active).toBe(Charts.Pending);
                });

                it('should move to Checking on prev', () => {
                    model.prev();
                    expect(model.active).toBe(Charts.Checking);
                });
                describe('with default model set to 2nd next position', () => {
                    beforeEach(() => {
                        model.next();
                    });

                    it('should move to Bills on next', () => {
                        model.next();
                        expect(model.active).toBe(Charts.Bills);
                    });

                    it('should move to Savings on prev', () => {
                        model.prev();
                        expect(model.active).toBe(Charts.Savings);
                    });
                });

            });
        });

    });


});
