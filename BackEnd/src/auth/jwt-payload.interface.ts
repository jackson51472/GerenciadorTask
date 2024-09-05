export interface JwtPayload {
  username: string; // ou login, de acordo com o seu modelo de usuário
  sub: number; // ou qualquer identificador único para o usuário
}
