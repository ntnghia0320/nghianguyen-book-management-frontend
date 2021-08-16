interface Props {
    comment: Comment,
    reload: Reload
}
export default function Comment({ reload, comment }: Props) {
    // <div className={classes.listComment} key={comment.id}>
    //     <Typography variant="h6" gutterBottom>{comment.user?.email}</Typography>
    //     <Typography variant="caption" gutterBottom>{comment.id}</Typography>
    //     <Typography variant="subtitle1" gutterBottom>
    //         {comment.message}
    //         {((getCurrentUser() && comment.user?.id === getCurrentUser().userId)
    //             || comment.user?.role?.name === "ROLE_ADMIN") && (
    //                 <>
    //                     <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
    //                         <MoreHorizIcon />
    //                     </IconButton>
    //                     <Menu
    //                         id="simple-menu"
    //                         anchorEl={anchorEl}
    //                         keepMounted
    //                         open={Boolean(anchorEl)}
    //                         onClose={handleClose}
    //                     >
    //                         <MenuItem onClick={() => deleteComment(comment.id)}>Delete</MenuItem>
    //                         <MenuItem onClick={() => editComment(comment.id)}>Edit{comment.id}</MenuItem>
    //                     </Menu>
    //                 </>
    //             )
    //         }
    //     </Typography>
    //     <Divider />
    // </div>
}