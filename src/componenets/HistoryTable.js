import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { capitalizeFirstLetter } from "../../utils/helper";

export default function HistoryTable({ historyRounds }) {
  return (
    <TableContainer component={Paper} sx={{ width: 650 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Round</TableCell>
            <TableCell>Player1</TableCell>
            <TableCell>Player2</TableCell>
            <TableCell>Player Winner</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {historyRounds &&
            historyRounds.map((round, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {round.player1Action
                    ? capitalizeFirstLetter(round.player1Action)
                    : "-"}
                </TableCell>
                <TableCell>
                  {round.player2Action
                    ? capitalizeFirstLetter(round.player2Action)
                    : "-"}
                </TableCell>
                <TableCell>
                  {round.winner ? `Player ${round.winner}` : "Draw"}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
