class Animal {
  _id;
  _nome;
  _proprietario;
  _dtNascimento;

  set id(id) {
    this._id = id;
  }
  get id() {
    return this._id;
  }
  set nome(nome) {
    this._nome = nome;
  }
  get nome() {
    return this._nome;
  }
  set proprietario(proprietario) {
    this._proprietario = proprietario;
  }
  get proprietario() {
    return this._proprietario;
  }
  set dtNascimento(dtNascimento) {
    this._dtNascimento = dtNascimento;
  }
  get dtNascimento() {
    return this._dtNascimento;
  }
  constructor(pId, pNome, pProprietario, pDtNascimento) {
    this.id = pId;
    this._nome = pNome;
    this._proprietario = pProprietario;
    this._dtNascimento = pDtNascimento;
  }
}
export default Animal;