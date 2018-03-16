# pipe-mail

A command-line tool to send e-mails via SMTP from the standard input.

## Installation

```bash
npm install -g pipe-mail
```

## Examples

You can directly send an e-mail from the command line:

```bash
echo "Hello world!" | pipe-mail -s Subject -o smtp.fastmail.com -u myusername -p mypassword fromaddress@fastmail.com toaddress@fastmail.com
```

If you don't want to specify the server options every time, you can set them as environment variables:

```bash
export SMTP_HOST=smtp.fastmail.com
export SMTP_USER=myusername
export SMTP_PASSWORD=mypassword
echo "Hello world!" | pipe-mail fromaddress@fastmail.com toaddress@fastmail.com
```

You can feed any file to it to send the content via e-mail:

```bash
echo "Hello world!" > email.txt
pipe-mail fromaddress@fastmail.com toaddress@fastmail.com < email.txt
```

## Usage

```
$ pipe-mail --help

  Usage: index [options] <from-email-address> <recipient-email-address>


  Options:

    -V, --version            output the version number
    -s, --subject <subject>  e-mail subject
    -o, --host <host>        SMTP server host
    -r, --port <port>        SMTP server port. Defaults to 485 if SSL is in use, 587 if not
    -n, --no-ssl             Don't use SSL when connecting to the SMTP server
    -u, --user <user>        SMTP login username
    -p, --pass <password>    SMTP login password
    -h, --help               output usage information
```

## Environment Variables

Some options can be specified via environment variables:

- **SMTP_HOST**
- **SMTP_PORT**
- **SMTP_USER**
- **SMTP_PASSWORD**

## Contributing

Feel free to report any issues or submit PRs via github


## Authors

* **Salvatore Zappalà** - *Initial work* - [salvozappa](https://github.com/salvozappa)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* This module is a wrapper around [nodemailer](https://nodemailer.com), a comprehensive Node.js module to send e-mails
* [This](https://vimeo.com/257056050) talk by Justin Searls ([@searls](https://github.com/searls)) was source of inspiration for unit testing. The [testdouble.js](https://github.com/testdouble/testdouble.js/) library makes the work straightforward
* Another nodemailer cli tool, [nodemailer-cli](https://github.com/fardog/nodemailer-cli) was also source of inspiration
