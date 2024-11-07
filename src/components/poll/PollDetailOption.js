import { Card, Button, Spinner, ProgressBar } from "react-bootstrap";

const PollDetailOption = ({
  option,
  votes,
  totalVotes,
  isUserVote,
  onVote,
  disabled,
  saveLoading,
  buttonVariants,
}) => {
  const percentage = totalVotes ? (votes.length / totalVotes) * 100 : 0;
  const buttonVariant = disabled ? "light" : buttonVariants;

  return (
    <Card className="response-card">
      <Card.Body>
        <Card.Title className="font-weight-bold">{option.text}</Card.Title>
        {disabled && (
          <>
            <p className="text-muted">Responses: {votes.length}</p>
            <ProgressBar now={percentage} label={`${percentage.toFixed(0)}%`} />
          </>
        )}
        {isUserVote && (
          <span className="badge bg-success mt-2">Your Choice</span>
        )}
        <Button
          className="mt-1"
          variant={buttonVariant}
          onClick={onVote}
          disabled={disabled}
        >
          {saveLoading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Vote for this"
          )}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PollDetailOption;
