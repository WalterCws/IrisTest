import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { TaskComponent } from './components/task/task.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterOutlet, NavbarComponent, TaskComponent],
      providers:[
        provideHttpClient(),
        provideHttpClientTesting(),
        DatePipe     
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
/* 
  it('should display navbar component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navbarElement = compiled.querySelector('app-navbar');
    expect(navbarElement).toBeTruthy();
  });

  it('should display navbar component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navbarElement = compiled.querySelector('app-navbar');
    expect(navbarElement).toBeTruthy();
  });

  it('should display task component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const taskElement = compiled.querySelector('app-task');
    expect(taskElement).toBeTruthy();
  }); */
});
