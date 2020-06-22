class Picture
{
    constructor(img, cellSize)
    {   
        this.img = img;
        this.cellSize = cellSize;
        this.gridX;
        this.gridY;
        this.grid;
    }

    gridCreate()
    {
      
        this.gridX = this.img.width / this.cellSize;
        this.gridY = this.img.height/ this.cellSize;

        this.grid = [this.gridX];

        for(let i = 0; i < this.gridX; i++)
        {
            this.grid[i] = [this.gridY];
        }
    }

    extractRgba()
    {
        for(var y = 0; y < this.gridY; y++)
        {
            for(let x = 0; x < this.gridX; x++)
            {
                this.grid[x][y] = get((x*(this.cellSize)),y*(this.cellSize));
            }
        }
    }
}