interface IMailCOnfig {
  driver: 'ethereal';
  defaults: {
    from: {
      name: string;
      email: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'contato@thalesmorais.dev',
      name: 'Thales Morais',
    },
  },
} as IMailCOnfig;
