import { Component, Input, Output, EventEmitter, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import Siema from 'siema';

import { NgxSiemaService } from './siema.service';

export interface NgxSiemaOptions {
  selector: string;
  duration?: number;
  easing?: string;
  perPage?: any;
  startIndex?: number;
  draggable?: boolean;
  threshold?: number;
  loop?: boolean;
  onInit?: Function;
  onChange?: Function;
}

@Component({
  selector: 'app-siema-slide',
  styles: [
    `
      :host {
        display: flex;
      }
    `,
  ],
  template: `
    <ng-content></ng-content>
  `,
})
export class NgxSiemaSlideComponent {
}

@Component({
  selector: 'app-siema',
  template: `
    <div class="{{ ngxClass }}">
      <ng-content select="app-siema-slide"></ng-content>
    </div>
  `,
})
export class NgxSiemaComponent implements AfterViewInit, OnInit, OnDestroy {

  @Input() options: NgxSiemaOptions;

  @Output() next = new EventEmitter<any>();
  @Output() prev = new EventEmitter<any>();
  @Output() goTo = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();
  @Output() insert = new EventEmitter<any>();
  @Output() prepend = new EventEmitter<any>();
  @Output() append = new EventEmitter<any>();
  @Output() destroy = new EventEmitter<any>();
  @Output() currentSlide = new EventEmitter<any>();

  ngxClass: string;

  private instance: any;

  private nextSubscription: Subscription;
  private prevSubscription: Subscription;
  private goToSubscription: Subscription;
  private removeSubscription: Subscription;
  private insertSubscription: Subscription;
  private prependSubscription: Subscription;
  private appendSubscription: Subscription;
  private destroySubscription: Subscription;
  private currentSlideSubscription: Subscription;

  constructor(private ngxSiemaService: NgxSiemaService) { }

  ngAfterViewInit() {
    this.instance = new Siema(this.options);
  }

  ngOnInit() {
    this.ngxClass = this.options.selector.replace('.', '');

    this.nextSubscription = this.ngxSiemaService.onNext()
      .subscribe((data: {
        selector: string,
        numbers: number,
        listener: BehaviorSubject<{ selector: string, currentSlide: number }>,
      }) => {
        if (this.compareSelectors(data.selector) && this.instance) {
          this.instance.next(data.numbers, () => {
            this.next.emit({
              selector: this.options.selector,
              currentSlide: this.instance.currentSlide,
            });
            data.listener.next({ selector: this.options.selector, currentSlide: this.instance.currentSlide });
          });
        }
      });

    this.prevSubscription = this.ngxSiemaService.onPrev()
      .subscribe((data: {
        selector: string,
        numbers: number,
        listener: BehaviorSubject<{ selector: string, currentSlide: number }>,
      }) => {
        if (this.compareSelectors(data.selector) && this.instance) {
          this.instance.prev(data.numbers, () => {
            this.prev.emit({
              selector: this.options.selector,
              currentSlide: this.instance.currentSlide,
            });
            data.listener.next({ selector: this.options.selector, currentSlide: this.instance.currentSlide });
          });
        }
      });

    this.goToSubscription = this.ngxSiemaService.onGoTo()
      .subscribe((data: {
        selector: string,
        index: number,
        listener: BehaviorSubject<{ selector: string, currentSlide: number }>,
      }) => {
        if (this.compareSelectors(data.selector) && this.instance) {
          this.instance.goTo(data.index, () => {
            this.goTo.emit({
              selector: this.options.selector,
              currentSlide: this.instance.currentSlide,
            });
            data.listener.next({ selector: this.options.selector, currentSlide: this.instance.currentSlide });
          });
        }
      });

    this.removeSubscription = this.ngxSiemaService.onRemove()
      .subscribe((data: {
        selector: string,
        index: number,
        listener: BehaviorSubject<{ selector: string, currentSlide: number }>,
      }) => {
        if (this.compareSelectors(data.selector) && this.instance) {
          this.instance.remove(data.index, () => {
            this.remove.emit({
              selector: this.options.selector,
              currentSlide: this.instance.currentSlide,
            });
            data.listener.next({ selector: this.options.selector, currentSlide: this.instance.currentSlide });
          });
        }
      });

    this.insertSubscription = this.ngxSiemaService.onInsert()
      .subscribe((data: {
        selector: string,
        item: any,
        index: number,
        listener: BehaviorSubject<{ selector: string, currentSlide: number }>,
      }) => {
        if (this.compareSelectors(data.selector) && this.instance) {
          this.instance.insert(data.item, data.index, () => {
            this.insert.emit({
              selector: this.options.selector,
              currentSlide: this.instance.currentSlide,
            });
            data.listener.next({ selector: this.options.selector, currentSlide: this.instance.currentSlide });
          });
        }
      });

    this.prependSubscription = this.ngxSiemaService.onPrepend()
      .subscribe((data: {
        selector: string,
        item: any,
        listener: BehaviorSubject<{ selector: string, currentSlide: number }>,
      }) => {
        if (this.compareSelectors(data.selector) && this.instance) {
          this.instance.prepend(data.item, () => {
            this.prepend.emit({
              selector: this.options.selector,
              currentSlide: this.instance.currentSlide,
            });
            data.listener.next({ selector: this.options.selector, currentSlide: this.instance.currentSlide });
          });
        }
      });

    this.appendSubscription = this.ngxSiemaService.onAppend()
      .subscribe((data: {
        selector: string,
        item: any,
        listener: BehaviorSubject<{ selector: string, currentSlide: number }>,
      }) => {
        if (this.compareSelectors(data.selector) && this.instance) {
          this.instance.append(data.item, () => {
            this.append.emit({
              selector: this.options.selector,
              currentSlide: this.instance.currentSlide,
            });
            data.listener.next({ selector: this.options.selector, currentSlide: this.instance.currentSlide });
          });
        }
      });

    this.destroySubscription = this.ngxSiemaService.onDestroy()
      .subscribe((data: {
        selector: string,
        restoreMarkup: boolean,
        listener: BehaviorSubject<{ selector: string }>,
      }) => {
        if (this.compareSelectors(data.selector) && this.instance) {
          this.instance.destroy(data.restoreMarkup, () => {
            this.destroy.emit({
              selector: this.options.selector,
            });
            data.listener.next({ selector: this.options.selector });
          });
        }
      });

    this.currentSlideSubscription = this.ngxSiemaService.onCurrentSlide()
      .subscribe((data: {
        selector: string,
        listener: BehaviorSubject<{ selector: string, currentSlide: number }>,
      }) => {
        if (this.compareSelectors(data.selector) && this.instance) {
          this.currentSlide.emit({
            selector: this.options.selector,
            currentSlide: this.instance.currentSlide,
          });
          data.listener.next({ selector: this.options.selector, currentSlide: this.instance.currentSlide });
        }
      });
  }

  ngOnDestroy() {
    if (this.instance) {
      setTimeout(() => {
        this.instance.destroy();
        this.instance = null;
      });
    }

    this.nextSubscription.unsubscribe();
    this.prevSubscription.unsubscribe();
    this.goToSubscription.unsubscribe();
    this.removeSubscription.unsubscribe();
    this.insertSubscription.unsubscribe();
    this.prependSubscription.unsubscribe();
    this.appendSubscription.unsubscribe();
    this.destroySubscription.unsubscribe();
    this.currentSlideSubscription.unsubscribe();
  }

  onNext(numbers: number = 1) {
    this.instance.next(numbers, this.next.emit({
      currentSlide: this.instance.currentSlide,
    }));
  }

  onPrev(numbers: number = 1) {
    this.instance.prev(numbers, this.next.emit({
      currentSlide: this.instance.currentSlide,
    }));
  }

  onGoTo(index: number) {
    this.instance.goTo(index, this.goTo.emit({
      currentSlide: this.instance.currentSlide,
    }));
  }

  onRemove(index: number) {
    this.instance.remove(index, this.remove.emit({
      currentSlide: this.instance.currentSlide,
    }));
  }

  onInsert(item: any, index: number) {
    this.instance.insert(item, index, this.insert.emit({
      currentSlide: this.instance.currentSlide,
    }));
  }

  onPrepend(item: any) {
    this.instance.prepend(item, this.prepend.emit({
      currentSlide: this.instance.currentSlide,
    }));
  }

  onAppend(item: any) {
    this.instance.append(item, this.append.emit({
      currentSlide: this.instance.currentSlide,
    }));
  }

  onDestroy(restoreMarkup: boolean = false) {
    this.instance.destroy(restoreMarkup, this.destroy.emit({
      currentSlide: this.instance.currentSlide,
    }));
  }

  onCurrentSlide() {
    this.currentSlide.emit({
      currentSlide: this.instance.currentSlide,
    });
  }

  private compareSelectors(selector: string) {
    return !selector || selector === this.options.selector;
  }
}
