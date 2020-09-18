let Button = MaterialUI.Button,
    Dialog = MaterialUI.Dialog,
    DialogActions = MaterialUI.DialogActions,
    DialogContent = MaterialUI.DialogContent,
    DialogContentText = MaterialUI.DialogContentText,
    DialogTitle = MaterialUI.DialogTitle,
    useMediaQuery = MaterialUI.useMediaQuery,
    useTheme = MaterialUI.useTheme,
    Grid = MaterialUI.Grid,
    withStyles  = MaterialUI.withStyles

const Tooltip = withStyles({
    tooltip: {
        fontSize: "16px",
        padding: "5px 15px",
        backgroundColor: "rgba(23, 23, 23, 0.55)"
    }
})(MaterialUI.Tooltip);

let requestOptions = {
    method : "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest',
    }
  }

const Modal = (props) => {
    const [open, setOpen] = React.useState(true);
    const [commendLoading, setLoading] = React.useState(false);
    const [commends, setCommends] = React.useState(props.data?props.data.COMMENDS:0);
    const [voted, setVoted] = React.useState(props.data?props.data.VOTED:false);
    const [scroll] = React.useState('paper');

    let hide
    if (props.data) hide = localStorage.getItem('modalHide_'+props.data.NAME);
    else hide = false
    
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
    const LinkButton = withStyles((theme) => ({
        root: {
          backgroundColor: "#6a4e02",
          color: "white",
          fontSize: "11px",
          '&:hover': {
            backgroundColor: "#9d711d",
          },
        },
      }))(Button);
    const CloseButton = withStyles((theme) => ({
    root: {
        backgroundColor: "#336c2a",
        fontSize: "11px",
        color: "white",
        '&:hover': {
        backgroundColor: "#419234",
        },
    },
    }))(Button);
    const HideButton = withStyles((theme) => ({
        root: {
          backgroundColor: "#434343",
          color: "white",
          padding: "10px 15px!important",
          fontSize: "11px",
          '&:hover': {
            backgroundColor: "#660e11",
          },
        },
      }))(Button);
    const handleLink = () => {
        document.location.href = props.data.LINK;
    }
    const handleHide = () => {
        localStorage.setItem('modalHide_'+props.data.NAME, 'true');
        setOpen(false);
    }
    const likeHandle = () => {
        setLoading(true);
        (async () => {
            requestOptions.body = JSON.stringify({"NAME" : props.data.NAME})
            let response = await fetch('/jx/modal_block.php', requestOptions)
            let json = await response.json()
            let newCommends = commends
            if (json['result']) {
                if (Number(json['result'])<0) {
                    setVoted(false)
                    setCommends(--newCommends)
                }
                else if (Number(json['result'])>0) {
                    setVoted(true)
                    setCommends(++newCommends)
                }
            } else {
                console.log("Ошибка обработчика")
            }
            setLoading(false)
        })()
    }
    return (
        !hide && props.data && <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            maxWidth="sm"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description">
            <DialogContent dividers={scroll === 'paper'}>
            <div className="modal_img">
                <div className="img_container">
                    <div className="modal_img" style={{backgroundImage:"url("+props.data.IMAGE+")"}}></div>
                </div>
            </div>
            </DialogContent>
            <DialogActions>
                <Tooltip title="Нравится">
                    <div className={`${"block_likes"} ${voted?"voted":""}`} onClick={likeHandle}>
                        <span className="block_likes_icon">
                            {commendLoading?<i className="fa fa-circle-o-notch fa-spin fa-fw" style={{fontSize:"18px"}}/>:<i className="fa fa-thumbs-up" aria-hidden="true"/>}
                        </span>
                        <span className="block_likes_text">
                            {commends>0&&commends}
                        </span>
                    </div>
                </Tooltip>
                
                {props.data.TEXT&&
                    <div className="text">
                        {props.data.TEXT}
                    </div>
                }
                <Grid container item spacing={3} style={{margin: "0",width: "100%"}}>
                    <Grid item xs={12} sm={4}>
                        <LinkButton onClick={()=>handleLink()} variant="contained">Узнать подробнее</LinkButton>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <CloseButton onClick={()=>handleClose()} variant="contained">Закрыть</CloseButton>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <HideButton onClick={()=>handleHide()} variant="contained">Больше не показывать</HideButton>
                    </Grid>
                </Grid>
            </DialogActions>
          </Dialog>
      );
}


ReactDOM.render(<Modal data={react_form_data}/>, document.getElementById('form_modal'));