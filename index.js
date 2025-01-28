class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Patrulater {
    constructor(point1, point2, point3, point4) {
        this.points = [point1, point2, point3, point4];
    }

    calculatePerimeter() {
        let perimeter = 0;
        for (let i = 0; i < this.points.length; i++) {
            const p1 = this.points[i];
            const p2 = this.points[(i + 1) % this.points.length];
            perimeter += Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
        }
        return perimeter;
    }

    calculateDiagonalIntersection() {
        const [A, B, C, D] = this.points;
        const denominator = (A.x - C.x) * (B.y - D.y) - (A.y - C.y) * (B.x - D.x);
        if (denominator === 0) {
            return null;
        }

        const numerator1 = (A.x * C.y - A.y * C.x);
        const numerator2 = (B.x * D.y - B.y * D.x);

        const x = (numerator1 * (B.x - D.x) - numerator2 * (A.x - C.x)) / denominator;
        const y = (numerator1 * (B.y - D.y) - numerator2 * (A.y - C.y)) / denominator;

        return new Point(x, y);
    }
}

class Dreptunghi extends Patrulater {
    constructor(point1, point2) {
        const point3 = new Point(point1.x, point2.y);
        const point4 = new Point(point2.x, point1.y);
        super(point1, point3, point2, point4);
    }

    calculatePerimeter() {
        const width = Math.abs(this.points[0].x - this.points[3].x);
        const height = Math.abs(this.points[0].y - this.points[1].y);
        return 2 * (width + height);
    }
}

class Patrat extends Dreptunghi {
    constructor(point1, point2) {
        super(point1, point2);
    }

    static fromTwoPoints(point1, point2) {
        const sideLength = Math.abs(point2.x - point1.x);
        const point3 = new Point(point1.x + sideLength, point1.y);
        const point4 = new Point(point1.x, point1.y + sideLength);
        return new Patrat(point1, point3);
    }
}

// Test
const point1 = new Point(1, 2);
const point2 = new Point(4, 3);

const dreptunghi = new Dreptunghi(point1, point2);
console.log("Perimetrul dreptunghiului: ", dreptunghi.calculatePerimeter());

const patrat = Patrat.fromTwoPoints(point1, new Point(4, 4));
console.log("Perimetrul patratului: ", patrat.calculatePerimeter());

const quadrilateral = new Patrulater(
    new Point(0, 0),
    new Point(4, 0),
    new Point(4, 3),
    new Point(0, 3)
);
console.log("Perimetrul patrulaterului: ", quadrilateral.calculatePerimeter());
console.log("Intersectia diagonalelor: ", quadrilateral.calculateDiagonalIntersection());
console.log('test')


