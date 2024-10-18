import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { SeguridadService } from '../services/seguridad.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  form: FormGroup;

  constructor(
    private seguridadService: SeguridadService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(9), this.passwordStrengthValidator]]
    });
  }

  ngOnInit(): void {
  }

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const isValid =
      hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

    return !isValid ? { passwordStrength: true } : null;
  }

  registrarUsuario() {
    this.seguridadService.registrarUsuario({
      nombre: this.form.get('nombre').value,
      apellido: this.form.get('apellido').value,
      username: this.form.get('username').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value,
    });
  }
}
