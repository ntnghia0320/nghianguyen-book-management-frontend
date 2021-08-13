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
        marginTop: 10,
        width: 345,
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
    },
    media: {
        height: 350,
        objectFit: 'contain'
    },
    cardButton: {
        textTransform: 'none',
        marginLeft: 'auto',
        color: 'rgb(114 137 198 / 1)',
    },
    cardContent: {
        height: 70,
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
                    <Typography variant="body2" color="textSecondary" component="p">
                        {book.author}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    size="small"
                    color="primary"
                    component={NavLink}
                    to={`/book/${book.id}`}
                    className={classes.cardButton}
                >
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}
