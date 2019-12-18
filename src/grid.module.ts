import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { GridComponent } from './grid.component';
import { GridColumnComponent } from './grid-column.component';
import { ContextTemplateDirective } from './context-template.directive';
import { GridColumnTemplateRenderComponent, GridTemplateRenderer } from './grid-template-renderer';
import { GridStickyScrollComponent } from './grid-sticky-scroll.component';
import { GridHeadingComponent } from './grid-heading.component';

/**
 * Grid module class.
 *
 * @author Branimir Borisov <branimir@raketasoft.com>
 * @since 1.0.0-beta.1
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    GridComponent,
    GridColumnComponent,
    GridTemplateRenderer,
    ContextTemplateDirective,
    GridStickyScrollComponent,
    GridHeadingComponent
  ],
  exports: [
    GridComponent,
    GridColumnComponent,
    ContextTemplateDirective,
    GridHeadingComponent
  ]
})
export class GridModule { }
