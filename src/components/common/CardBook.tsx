import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        margin: 'auto',
        height: 500,
        marginTop: 20,
        width: 345,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        backdropFilter: 'blur(25px)',
        boxShadow: '20px 20px 22px rgba(0, 0, 0, 0.2)',
        border: '2px solid rgba(255,255,255,0.1)',
        color: '#000000'
    },
    media: {
        height: 350,
        objectFit: 'contain'
    },
    cardButton: {
        textTransform: 'none',
        marginLeft: 'auto',
        color: '#000000'
    },
    cardContent: {
        height: 70,
        color: '#000000'
    }
});

interface Prop {
    book: Book
}

export default function CardBook({ book }: Prop) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    className={classes.media}
                    image={book.image}
                    title="Contemplative Reptile"
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {book.title}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {book.author}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    color="primary"
                    component={NavLink}
                    to={`/book/${book.id}`}
                    className={classes.cardButton}
                >
                    View
                </Button>
            </CardActions>
        </Card>
    );
}
