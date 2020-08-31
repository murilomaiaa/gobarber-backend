# Recuperação de senha

**RF**
- O usuário deve poder recuperar sua senha informando o seu e-mail
- O usuário deve poder receber um e-mail com instruções de recuperação de senha
- O usuário deve poder redefinir sua senha

**RNF**

- Utilizar o MailTrap para testar envios em ambiente dev
- Utilizar o Amazon SES para envios em produção
- O envio de e-mails deve acontecer em segundo plano

**RN**

- O link enviado por e-mail para redefinir senha deve expirar em 2h
- O usuário precisa confirmar a nova senha ao redefini-la

# Atualização do perfil

**RF**

- O usuário deve poder atualizar o seu nome, email e senha

**RN**

- O usuário não pode alterar seu email para um email já utilizado
- Para atualizar sua senha, o usuário deve informar a senha antiga
- Para atualizar sua senha, o usuário precisa confirmar a nova senha

# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos em um dia específico
- O prestador deve receber uma notificação sempre que houver um novo agendamento
- O prestador deve poder visualizar as notificações não lidas

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache
- As notificações do prestador devem ser armazenados no MongoDB
- As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io

**RN**

- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviços cadastrados
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador
- O usuário deve poder realizar um novo agendamento com o prestador

**RNF**

- A listagem de prestadores deve ser armazenada em cache

**RN**

- Cada agendamento deve durar 1h exatamente
- Os agendamentos devem estar disponíveis entre 8h às 18h
- O usuário não pode agendar em um horário já ocupado
- O usuário não pode agendar em um horário que já passou
- O usuário não pode agendar em um horário consigo
