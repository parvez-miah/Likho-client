import React from 'react';
import Card from 'react-bootstrap/Card';
import UseNotes from '../../Hooks/UseNotes';
import { Link } from 'react-router-dom';
import { Badge, Spinner, Row, Col } from 'react-bootstrap';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const NotesHome = () => {
    const [notes, , isLoading] = UseNotes();

    if (isLoading) {
        return <Spinner animation="border" variant="success" />;
    }

    const sortedNotes = notes.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));


    return (
        <div className='tiro-bangla'>
            {notes.length === 0 ? (
                <div>
                    <h1 style={{ color: 'red' }}>
                        <SentimentVeryDissatisfiedIcon />
                        Uhhh! Ahhh! Looks like there are no notes here! {' '}
                    </h1>
                    <h2>
                        
                        <br />
                        <br />
                        <Link to="/AddaNote">
                            <Badge> Add Your First Note</Badge>
                        </Link>
                    </h2>
                </div>
            ) : (
                <Row>
                        {sortedNotes.map((note, index) => (
                        <Link
                            key={note._id} // Add key here
                            style={{ textDecoration: 'none', color: 'inherit' }}
                            to={`/note/${note._id}`}
                        >
                            <Col xs={12} lg={4} style={{ marginBottom: '15px' }}>
                                <Card style={{ textAlign: 'left' }}>
                                    <Card.Body>
                                        <Link
                                            to={`/note/${note._id}`}
                                            style={{ textDecoration: 'none', color: 'inherit' }}
                                        >
                                            <Card.Title>{note.title}</Card.Title>
                                            <Card.Text>
                                                {note.details?.length > 100
                                                    ? `${note.details.substring(0, 100)}...`
                                                    : note.details || ''}
                                            </Card.Text>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Link>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default NotesHome;
