import ISendMail from './../dtos/ISendMailDTO';

export default interface IMailProvider {
  sendMail(data: ISendMail): Promise<void>;
}
