import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TrackRow from '../TrackRow';
import { usePlayerStore } from '@/store/usePlayerStore';

// Mock the Zustand store
jest.mock('@/store/usePlayerStore');

const mockSong = {
  id: '1',
  title: 'Test Song',
  artist: 'Test Artist',
  coverUrl: 'https://example.com/cover.jpg',
  sourceUrl: 'https://example.com/audio.mp3',
  duration: 185, // 3:05
};

describe('TrackRow Component', () => {
  const mockPlaySong = jest.fn();

  beforeEach(() => {
    // Reset the mock implementation before each test
    (usePlayerStore as unknown as jest.Mock).mockReturnValue({
      playSong: mockPlaySong,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the song title and artist correctly', () => {
    render(<TrackRow song={mockSong} />);
    
    expect(screen.getByText('Test Song')).toBeInTheDocument();
    // Artist appears twice (once in title column, once in album column)
    expect(screen.getAllByText('Test Artist').length).toBeGreaterThan(0);
  });

  it('renders the cover image when showCover is true', () => {
    render(<TrackRow song={mockSong} showCover={true} />);
    
    const coverImage = screen.getByAltText('Test Song');
    expect(coverImage).toBeInTheDocument();
    expect(coverImage).toHaveAttribute('src', 'https://example.com/cover.jpg');
  });

  it('does not render the cover image when showCover is false', () => {
    render(<TrackRow song={mockSong} showCover={false} />);
    
    const coverImage = screen.queryByAltText('Test Song');
    expect(coverImage).not.toBeInTheDocument();
  });

  it('formats the duration correctly', () => {
    render(<TrackRow song={mockSong} />);
    
    // 185 seconds = 3:05
    expect(screen.getByText('3:05')).toBeInTheDocument();
  });

  it('renders a fallback duration if duration is not provided', () => {
    const songWithoutDuration = { ...mockSong, duration: undefined };
    render(<TrackRow song={songWithoutDuration} />);
    
    expect(screen.getByText('3:42')).toBeInTheDocument();
  });

  it('calls playSong from the Zustand store when clicked', () => {
    render(<TrackRow song={mockSong} />);
    
    const row = screen.getByText('Test Song').closest('div.group');
    fireEvent.click(row!);
    
    expect(mockPlaySong).toHaveBeenCalledTimes(1);
    expect(mockPlaySong).toHaveBeenCalledWith(mockSong);
  });

  it('calls onPlay prop if provided', () => {
    const mockOnPlay = jest.fn();
    render(<TrackRow song={mockSong} onPlay={mockOnPlay} />);
    
    const row = screen.getByText('Test Song').closest('div.group');
    fireEvent.click(row!);
    
    expect(mockOnPlay).toHaveBeenCalledTimes(1);
    expect(mockOnPlay).toHaveBeenCalledWith(mockSong);
    // playSong from store should ALSO be called
    expect(mockPlaySong).toHaveBeenCalledTimes(1);
  });

  it('renders the index if provided', () => {
    render(<TrackRow song={mockSong} index={4} />);
    
    // Index + 1 is rendered (5)
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
