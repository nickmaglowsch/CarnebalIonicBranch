export class User {
    cdUsuario: string;
    foto: string;
    isFirstAccess: boolean;
    nome: string;
    constructor(_cdUsuario: string, _foto: string, _isFirstAccess: boolean, _nome: string) {
        this.cdUsuario = _cdUsuario;
        this.foto = _foto;
        this.isFirstAccess = _isFirstAccess;
        this.nome = _nome;
    }
}