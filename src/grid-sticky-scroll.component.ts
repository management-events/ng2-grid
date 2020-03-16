import {
  Component,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  ViewChild,
  OnInit
} from '@angular/core';

@Component({
  selector: 'ng-grid-sticky-scroll',
  template: `
      <div class="sticky-scroll" #stickyScroll>
          <div class="horizontal-scrollbar">
              <div
                      #areaCopy
                      class="horizontal-scrollbar-copy">
              </div>
          </div>
      </div>`
})
export class GridStickyScrollComponent implements OnInit {
  @Input() scrollableElement: ElementRef;
  @ViewChild('stickyScroll', {static: true}) scrollContainer: ElementRef;
  @ViewChild('areaCopy', {static: true}) areaCopy: ElementRef;

  private tableScrollListener: any;
  private stickyScrollListener: any;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.tableScrollListener = this.attachScrollListener(
      this.scrollableElement.nativeElement.parentElement,
      this.onTableScroll
    );
    this.stickyScrollListener = this.attachScrollListener(
      this.areaCopy.nativeElement.parentElement,
      this.onScroll
    );
  }

  /**
   * Handle window scroll event.
   */
  @HostListener('window:scroll', ['$event'])
  protected onWindowScroll(event: UIEvent) {
    const documentTopOffset: number = document.documentElement.scrollTop;
    const scrollableElementTopOffset: number = this.scrollableElement.nativeElement.parentElement.offsetTop;
    const scrollableElementWidth: number = this.scrollableElement.nativeElement.scrollWidth;
    const clientWidth: number = this.scrollableElement.nativeElement.parentElement.clientWidth;

    if (scrollableElementTopOffset - documentTopOffset <= 0 && scrollableElementWidth > clientWidth) {
      this.areaCopy.nativeElement.style.width = this.calculateStickyScrollWidth() + 'px';
      this.renderer.addClass(
        this.scrollContainer.nativeElement,
        'sticky-scrollbar-visible'
      );
    } else {
      this.renderer.removeClass(
        this.scrollContainer.nativeElement,
        'sticky-scrollbar-visible'
      );
    }
  }

  /**
   * Attaches scroll listener to given dom element
   *
   * @param element
   * @param callback
   */
  attachScrollListener(element: any, callback: (event: Event) => void): () => void {
    return this.renderer.listen(
      element,
      'scroll',
      callback.bind(this)
    );
  }

  /**
   * Synchronizes sticky scrollbar when grid scrollbar is moved
   *
   * @param event
   */
  onTableScroll(event: Event): void {
    const scrollableElementWidth: number = this.scrollableElement.nativeElement.scrollWidth;
    const stickyScrollWidth: number = this.areaCopy.nativeElement.scrollWidth;
    const scrollRatio: number = (stickyScrollWidth / scrollableElementWidth);
    const areaCopyParent: HTMLElement = this.areaCopy.nativeElement.parentElement;
    this.stickyScrollListener();
    areaCopyParent.scrollLeft = Number(Number((event.srcElement as Element).scrollLeft * scrollRatio).toFixed());
    this.stickyScrollListener = this.attachScrollListener(
      areaCopyParent,
      this.onScroll
    );
  }

  /**
   * Handles onScroll event of the sticky scrollbar and modified scrollable
   * element scrollLeft property
   *
   * @param {Event} event
   */
  onScroll(event: Event): void {
    const scrollableElementWidth: number = this.scrollableElement.nativeElement.scrollWidth;
    const stickyScrollWidth: number = this.areaCopy.nativeElement.scrollWidth;
    const scrollRatio: number = scrollableElementWidth / stickyScrollWidth;
    const scrollableElementParent: HTMLElement = this.scrollableElement.nativeElement.parentElement;
    this.tableScrollListener();
    scrollableElementParent.scrollLeft = Number(Number((event.srcElement as Element).scrollLeft * scrollRatio).toFixed());
    this.tableScrollListener = this.attachScrollListener(
      scrollableElementParent,
      this.onTableScroll
    );
  }

  /**
   * Calculates the width of the sticky scrollbar copy element
   *
   * @returns {number}
   */
  private calculateStickyScrollWidth(): number {
    const scrollWidth: number = this.scrollableElement.nativeElement.scrollWidth;
    const clientWidth: number = this.scrollableElement.nativeElement.parentElement.clientWidth;
    const stickyScrollbarWidth: number = this.scrollContainer.nativeElement.clientWidth;
    const scrollRatio: number = scrollWidth / clientWidth;

    return (stickyScrollbarWidth * scrollRatio);
  }
}
