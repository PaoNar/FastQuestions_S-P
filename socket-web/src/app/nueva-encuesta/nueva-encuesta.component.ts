import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-nueva-encuesta',
  templateUrl: './nueva-encuesta.component.html',
  styleUrls: ['./nueva-encuesta.component.scss']
})
export class NuevaEncuestaComponent implements OnInit {
  
  
  constructor(private fb: FormBuilder){
    
  }

  //DECLARACIONES - BEGIN
  registerForm: FormGroup
  patternForm: FormGroup
  firstName: String
  secondName: String[]
  lastnames: String
  mail: string
  phone: string
  operadora: String[]
  message: String
  parametros: Array<any>
  //DECLARACIONES - FINISH

  //CLASE
  usuarioform: FormGroup                    
  telefonos: FormArray                                //Declarar como FormArray
  operadoraClases: String[]
  //CLASE

  ngOnInit() {
    this.cargarParametros()
    this.createregisterForm(),
    this.examplepatternForm()

    //clase
    this.crearUsuarioForm()
    this.operadoraClases = ['Claro','CNT','Movistar','Tuenti']
    //clase
    
  }

  //clase
  crearUsuarioForm(){
    this.usuarioform = this.fb.group({
      nombre: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      telefonos: this.fb.array([this.creartelefonoform()])
    })
  }

  creartelefonoform(): FormGroup{
    return this.fb.group({
      operadora: ['999', [Validators.required]],
      numero: ['', [Validators.required]]
    })
  }

  addTelefonoForm(){
    this.telefonos = this.usuarioform.get('telefonos') as FormArray
    this.telefonos.push(this.creartelefonoform())                           //Añado un nuevo grupo de formularios
  }

  eliminarTelefonoForm(i){
    this.telefonos.removeAt(i)
  }
  //clase

    // FUNCIONES - INICIO
    createregisterForm() {
      this.registerForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.pattern('^[A-Z]+[a-z]*$')]],
        secondName: this.fb.array([this.fb.group({name2: ['']})]),
        lastnames: ['', [Validators.required, Validators.pattern('^[A-Z]+[a-zñ]{2,} [A-Z]+[a-zñ]{2,}$')]],
        mail: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z]+[a-zA-Z0-9._-ñ]*@[a-z]+[a-z0-9]*.[a-z]{2,3}[.]?[a-z]{2,3}$')]],
        phone: ['', [Validators.required, Validators.pattern('(09)+[0-9]{8}')]],
        operadora: this.fb.array([this.fb.group({
          phone1: ['', [Validators.required, Validators.pattern('(09)+[0-9]{8}')]],
          phone2: ['', [Validators.required]]})])
      })
    }

    examplepatternForm(){
      this.patternForm = this.fb.group({
        example1: ['', [Validators.pattern('^[a-z-_A-Z0-9ñ]+[a-zA-Z0-9._-ñ]*@[a-z]+[a-z0-9]*.[a-z]{2,3}[.](?:[a-z]{2,3})$')]],
        example2: ['', [Validators.pattern('(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{4,16}')]]
      })
    }

    get getPhones(){
      return this.registerForm.get('operadora') as FormArray
    }

    get getSecondName(){
      return this.registerForm.get('secondName') as FormArray
    }

    addPhones(){
      const celular = <FormArray>this.registerForm.controls['operadora']
      celular.push(this.fb.group({phone2:[]}))
    }

    addSecondName(){
      const addName = <FormArray>this.registerForm.controls['secondName']
      addName.push(this.fb.group({name2:[]}))
    }

    deletePhones(value){
      const celular = <FormArray>this.registerForm.controls['operadora']
      celular.removeAt(value)
    }

    deleteSecondName(value){
      const removeName = <FormArray>this.registerForm.controls['secondName']
      removeName.removeAt(value)
    }

  submit() {
    if(this.registerForm.invalid){
      alert(`Complete todos los campos correctamente`)
    }else{
      alert(`Se ha registrado exitosamente`)
    }
  }
  
    //FUNCIONES - FIN

    cargarParametros() {
      Swal.mixin({
        input: 'number',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2']
      }).queue([
        'Número de preguntas',
        'Número de opciones por pregunta',
      ]).then(async (result: any) => {
        if (result.value) {
          this.parametros = await result.value
          Swal.fire({
            title: 'Se encuesta se esta creando!',
          })
        }
      })
    }

    dibujarEncuesta() {
      let contenedor = document.getElementById('preguntas');

      //dibujar preguntas
      // for(let preguntas = 1; preguntas = parseInt(this.parametros[0]); preguntas++) {
      //   let pregunta = document.createElement('div'),
      //    nuevoInputPregunta = document.createElement('input');
      //   pregunta.appendChild(nuevoInputPregunta);
      // }
      
      console.log(contenedor)
    }
}
