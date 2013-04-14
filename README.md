backlife
========

Conway's Game of Life... IN REVERSE!

Obviously this isn't there yet. I've just got the forwards part working...

Brain Dump 04/14/2013
=====================

The basic idea, if I understand Woods' algorithm correctly (based on the curt description Neil Bickford gives it [here](http://nbickford.wordpress.com/2012/04/15/reversing-the-game-of-life-for-fun-and-profit/) - I can't find the paper anywhere [if there is one]), is for each cell, generate a list of 3x3 patterns (the cell and its 8 neighbors) which would lead to that cell's current state in a previous state. Then merge those cells together... somehow.

So at this point I'm just focusing on generating those 3x3 patterns. What I'll do, I think, is generate all the possible 3x3 patterns (2^9, or 512 of them) and then sort them into "alive" or "dead" piles based on whether they'd lead to that center cell becoming alive or dead.

After that, though, I haven't really thought through how the "merging" operation will happen... To brute force it seems like it might be really slow. I'd start in the top-left corner, find the first pattern that leads to its state. Then the next cell to the right, I find the first pattern that leads to its state WHILE overlapping the pattern I picked to the left. And so on... but then at some point I might hit a dead end, where there is no pattern that fits with the cells around it, so then I need to be able to backtrack. But doing so recursively would easily jump over Chrome's generous ~21,000-call recursion limit for anything bigger than about 140x140.

Documentation on this problem is hard to find. I've tried understanding Neil's code from the above link, and probably could grok it if I kept at it long enough, but at this point I'm just going to charge in and see what I can divine out of trial and error.