import {
  Component,
  TemplateRef,
  ContentChild
} from '@angular/core';

/**
 * Grid column class.
 *
 * Defines a single Grid column with its properties inside the html template.
 *
 * @author Branimir Borisov <branimir@raketasoft.com>
 * @since 1.0.0-alpha.1
 */
@Component({
  'selector': 'ng-grid-heading',
  'template': ''
})
export class GridHeadingComponent {
  @ContentChild(TemplateRef) public template: TemplateRef<any>;
}
