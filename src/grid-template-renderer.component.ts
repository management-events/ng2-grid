import {
  Component,
  ViewContainerRef,
  Input,
  OnInit, TemplateRef
} from '@angular/core';

/**
 * GridTemplateRendererComponent component used to render Grid column templates.
 *
 * @author Branimir Borisov <branimir@raketasoft.com>
 * @since 1.0.0-alpha.4
 */
@Component({
  selector: 'ng-grid-template-renderer',
  template: ''
})
export class GridTemplateRendererComponent implements OnInit {
  @Input() public context: any;
  @Input() public template: TemplateRef<any>;

  /**
   * Class constructor.
   *
   * @param {ViewContainerRef} viewContainerRef
   */
  constructor(private viewContainerRef: ViewContainerRef) {}

  /**
   * Handle onInit event.
   */
  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.template, this.context);
  }
}
