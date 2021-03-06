/*
Кастомный компонент на замену стандартных свичей в настройках (например в кредитном калькуляторе)
*/

let _MaterialUI = MaterialUI,
    withStyles  = _MaterialUI.withStyles,
    Switch = _MaterialUI.Switch;

window.reactElements.IOSSwitch = withStyles( (theme) => ({
    root: {
        width: 52,
        height: 26,
        padding: 0,
        margin: "11px",
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(26px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: '#52b443;',
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
        },
    },
    thumb: {
        width: 24,
        height: 24,
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {
        
    },
    focusVisible: {},
    }))(({ classes, ...props }) => {
    return (
        <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
            root: classes.root,
            switchBase: classes.switchBase,
            thumb: classes.thumb,
            track: classes.track,
            checked: classes.checked,
        }}
        {...props}
        />
    );
    });
