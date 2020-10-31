import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountInfoComponent } from './account-info.component';
import { AccountInfoRoutingModule } from './account-info-routing.module';
import { from } from 'rxjs';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AccountInfoComponent
  ],
  imports: [
    CommonModule,
    AccountInfoRoutingModule,ReactiveFormsModule,MatCardModule, FormsModule,MatButtonModule,MatIconModule,MatFormFieldModule,MatInputModule,MatSelectModule
  ]
})
export class AccountInfoModule { }
