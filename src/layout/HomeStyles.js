const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 32,
    [theme.breakpoints.up('md')]: {
      paddingLeft: 96,
      paddingRight: 96,
      paddingTop: 48,
    },
  },
  tabBar: {
    backgroundColor: '#fff',
    boxShadow: 'none',
    minHeight: 48,
    borderBottom: '1px solid #f8f8f8'
  },
  grow: {
    flexGrow: 1
  },
  subContainer: {
    flexGrow: 1,
    borderRadius: 5
  },
  tabContents: {
    minHeight: 500,
    backgroundColor: '#fff',
  },
  mainContainer: {
    flexGrow: 1,
  },
  toolbar: {
    minHeight: 48
  },
})

export default styles