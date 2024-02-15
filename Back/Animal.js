class Animal{
  _id;
  _nome;
  _proprietario;
  _dtNascimento;
  set id(id){
    this._id = id;
  }
  get id(){
    return this._id;
  }
  set nome(nome){
    this._nome = nome;
  }
  get nome(){
    return this._nome;
  }
  set proprietario(proprietario){
    this._proprietario = proprietario;
  }
  get proprietario(){
    return this._proprietario;
  }
  set dtNascimento(dtNascimento){
    this._dtNascimento = dtNascimento;
  }
  get dtNascimento(){
    return this._dtNascimento;
  }
  constructor(nome, proprietario, dtNascimento){
    this._nome = nome;
    this._proprietario = proprietario;
    this._dtNascimento = dtNascimento;
  }
}