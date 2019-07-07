import React, { Component } from "react";
import Cell from "./Cell";
import "../assets/Board.css";


class Board extends Component {
    static defaultProps = {
        nrows: 5,
        ncols: 5,
        chanceLightStartsOn: 0.13
    };

    constructor(props) {
        super(props);
        this.state = {
            hasWon: false,
            board: this.createBoard()
        };
        this.flipCellsAround = this.flipCellsAround.bind(this);
    }

    createBoard() {
        let board = [];
        for (let y = 0; y < this.props.nrows; y++) {
            let row = [];
            for (let x = 0; x < this.props.ncols; x++) {
                row.push(Math.random() < this.props.chanceLightStartsOn);
            }
            board.push(row);
        }
        return board;
    }

    flipCellsAround(coord) {
        let { ncols, nrows } = this.props;
        let board = this.state.board;
        let [y, x] = coord.split("-").map(Number);

        function flipCell(y, x) {
            if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
                board[y][x] = !board[y][x];
            }
        }

        flipCell(y, x);
        flipCell(y, x - 1);
        flipCell(y, x + 1);
        flipCell(y - 1, x);
        flipCell(y + 1, x);
        let hasWon = board.every(row => row.every(cell => !cell));
        this.setState({ board, hasWon });
    }

    handleButtonClick = () => {
        console.log("BUTTON Pressed")
    }

    render() {
        let tblBoard = [];
        for (let y = 0; y < this.props.nrows; y++) {
            let row = [];
            for (let x = 0; x < this.props.ncols; x++) {
                let coord = `${y}-${x}`;
                row.push(
                    <Cell
                        key={coord}
                        isLit={this.state.board[y][x]}
                        flipCellsAroundMe={() => this.flipCellsAround(coord)}
                    />
                );
            }
            tblBoard.push(<tr key={y}>{row}</tr>);
        }
        return (
            <div>
                {this.state.hasWon ? (
                    <div className="Board-title">
                        <div className="neon-blue">You</div>
                        <div className="neon-orange">Won</div>
                    </div>
                ) : (
                        <div>
                            <div className="Board-title">
                                <div className="neon-blue">Light</div>
                                <div className="neon-orange">Flipper</div>
                            </div>
                            <table className="Board">
                                <tbody>{tblBoard}</tbody>
                            </table>
                            <p className="neon-orange text">Make all the lights deem to win</p>
                        </div>
                    )}
            </div>
        );
    }
}

export default Board;
