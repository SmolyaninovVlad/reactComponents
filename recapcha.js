let Button = MaterialUI.Button,
    Dialog = MaterialUI.Dialog,
    DialogActions = MaterialUI.DialogActions,
    DialogContent = MaterialUI.DialogContent,
    DialogContentText = MaterialUI.DialogContentText,
    DialogTitle = MaterialUI.DialogTitle

window.reactElements.Recapcha = class Recapcha extends React.Component {
    constructor(props) {
        super(props);
        this.callback=this.callback.bind(this)
        this.expired=this.expired.bind(this)
    }

    callback(token){
        console.log("capcha token: ", token)
        this.props.capchaCallBack(token)
    }
    expired(){
        console.log("recapcha Expired")
    }

    componentDidMount(){
        try {
            grecaptcha.render(this.refs.recaptcha, {
                'sitekey': this.refs.recaptcha.dataset.sitekey,
                'data-size':'invisible',
                'callback': this.callback,
                'expired-callback' : this.expired
            });
        }
        catch(error) {
            console.log("Ошибка капчи: ", error)
        }

    }

    render(){
        return(
            <div className={this.props.className && this.props.className}>
                <div 
                    className="g-recaptcha-child-block" 
                    data-sitekey="6LeXACEUAAAAAKXPpKXpFZcP251hzks8qkEmdlmO" 
                    ref="recaptcha"
                    >    
                </div>
            </div>
        )
    }
}
window.reactElements.Label = () => {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
          
    const handleClickOpen = scrollType => () => {
        event.preventDefault()
        setOpen(true);
        setScroll(scrollType);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
            descriptionElement.focus();
        }
        }
    }, [open]);
          

    return (
        <div>
          Я соглашаюсь с <span onClick={handleClickOpen('paper')} style={{color:"#428a37", borderBottom:"1px solid",borderBottomColor: "rgba(66, 138, 55, 0.5)",opacity: "1",cursor:"pointer"}}>условиями обработки и использовании моих персональных данных</span>
          <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            maxWidth="md"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description">
            <DialogTitle id="scroll-dialog-title">Согласие на обработку персональных данных</DialogTitle>
            <DialogContent dividers={scroll === 'paper'} >
            <div className="popup-body" style={{padding: "10px 20px", color: "#292b2c",fontFamily: '"OpenSans", "Helvetica Neue", Arial, sans-serif'}}>
                        <p>Я уведомлен о том, что информация, переданная мною по сети Интернет, может стать доступной третьим лицам, и освобождаю ПАО СКБ Приморья «Примсоцбанк» (далее - Банк), от ответственности, в случае, если указанные мною сведения станут доступными третьим лицам.<br/><br/>Я даю Банку свое согласие:</p>
                        <ul>
                            <li>на обработку своих персональных данных, в том числе сбор, проверку достоверности представленной информации путем обращения к третьим лицам;</li>
                            <li>на обращение в любое бюро кредитных историй для получения информации, предусмотренной статьей 6 Федерального Закона № 218-ФЗ от 20.12.2004 «О кредитных историях»;</li><li>на получение информации о предварительном решении по оформленной заявке по средством sms-информирования и электронной почте.</li>
                        </ul>
                    </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained" color="primary">
                Закрыть
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}

